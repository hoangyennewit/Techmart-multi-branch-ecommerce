resource "aws_ecr_repository" "backend" {
  name                 = "${local.resource_suffix}-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecs_cluster" "main" {
  name = "${local.resource_suffix}-cluster"
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${local.resource_suffix}-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_cloudwatch_log_group" "ecs_logs" {
  name              = "/ecs/${local.resource_suffix}-backend"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "backend" {
  family                   = "${local.resource_suffix}-backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  volume {
    name = "backend_logs"
  }

  container_definitions = jsonencode([
    {
      name  = "backend"
      image = "${aws_ecr_repository.backend.repository_url}:latest"
      command = ["sh", "-c", "npm run start 2>&1 | tee /var/log/backend_logs/app.log"]
      mountPoints = [
        {
          sourceVolume  = "backend_logs"
          containerPath = "/var/log/backend_logs"
        }
      ]
      portMappings = [
        {
          containerPort = 5000
          hostPort      = 5000
        }
      ]
      environment = [
        {
          name  = "DB_HOST"
          value = local.db_host
        },
        {
          name  = "DB_USER"
          value = var.db_username
        },
        {
          name  = "DB_PASSWORD"
          value = var.db_password
        },
        {
          name  = "DB_NAME"
          value = local.env == "production" ? "techmart_db_production" : "techmart_db_staging"
        },
        {
          name  = "GOOGLE_CLIENT_ID"
          value = var.google_client_id
        },
        {
          name  = "GOOGLE_CLIENT_SECRET"
          value = var.google_client_secret
        },
        {
          name  = "FRONTEND_URL"
          value = "https://${local.domain_name}"
        },
        {
          name  = "GOOGLE_CALLBACK_URL"
          value = "https://${local.api_domain_name}/api/auth/google/callback"
        },
        {
          name  = "ZALOPAY_APP_ID"
          value = "2553"
        },
        {
          name  = "ZALOPAY_KEY1"
          value = var.zalopay_key1
        },
        {
          name  = "ZALOPAY_KEY2"
          value = var.zalopay_key2
        },
        {
          name  = "ZALOPAY_ENDPOINT"
          value = "https://sb-openapi.zalopay.vn/v2/create"
        },
        {
          name  = "ZALOPAY_CALLBACK_URL"
          value = "https://${local.api_domain_name}/api/payments/zalopay/callback"
        },
        {
          name  = "NODE_OPTIONS"
          value = "--dns-result-order=ipv4first"
        },
        {
          name  = "GEMINI_API_KEY"
          value = var.gemini_api_key
        },
        {
          name  = "JWT_SECRET"
          value = var.jwt_secret
        },
        {
          name  = "vnp_TmnCode"
          value = var.vnp_tmn_code
        },
        {
          name  = "vnp_HashSecret"
          value = var.vnp_hash_secret
        },
        {
          name  = "vnp_Url"
          value = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
        },
        {
          name  = "vnp_ReturnUrl"
          value = "https://${local.api_domain_name}/api/payment/vnpay_return"
        },
        {
          name  = "MOMO_PARTNER_CODE"
          value = var.momo_partner_code
        },
        {
          name  = "MOMO_ACCESS_KEY"
          value = var.momo_access_key
        },
        {
          name  = "MOMO_SECRET_KEY"
          value = var.momo_secret_key
        },
        {
          name  = "MOMO_ENDPOINT"
          value = "https://test-payment.momo.vn/v2/gateway/api/create"
        },
        {
          name  = "MOMO_REDIRECT_URL"
          value = "https://${local.api_domain_name}/api/payments/momo/return"
        },
        {
          name  = "MOMO_IPN_URL"
          value = "https://${local.api_domain_name}/api/payments/momo/ipn"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs_logs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    },
    {
      name  = "promtail"
      image = "grafana/promtail:2.9.0"
      essential = false
      entryPoint = ["sh", "-c"]
      command = [
        "cat << 'EOF' > /etc/promtail/config.yml\n${file("${path.module}/../promtail-config.yml")}\nEOF\n/usr/bin/promtail -config.file=/etc/promtail/config.yml"
      ]
      mountPoints = [
        {
          sourceVolume  = "backend_logs"
          containerPath = "/var/log/backend_logs"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs_logs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "promtail"
        }
      }
    }
  ])
}

resource "aws_security_group" "alb" {
  name        = "${local.resource_suffix}-alb-sg"
  description = "Allow inbound traffic to ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ecs_tasks" {
  name        = "${local.resource_suffix}-ecs-tasks-sg"
  description = "Allow inbound access from the ALB only"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "main" {
  name               = "${local.resource_suffix}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [aws_subnet.public_1.id, aws_subnet.public_2.id]
}

resource "aws_lb_target_group" "backend" {
  name        = "${local.resource_suffix}-tg"
  port        = 5000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    path                = "/api/v1/health" # Assuming there's a health check endpoint, otherwise use "/"
    healthy_threshold   = 2
    unhealthy_threshold = 10
    timeout             = 3
    interval            = 30
    matcher             = "200-499"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }
}

resource "aws_ecs_service" "main" {
  name            = "${local.resource_suffix}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = [aws_subnet.public_1.id, aws_subnet.public_2.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name   = "backend"
    container_port   = 5000
  }

  depends_on = [aws_lb_listener.http]
}

output "alb_dns_name" {
  value = aws_lb.main.dns_name
}

