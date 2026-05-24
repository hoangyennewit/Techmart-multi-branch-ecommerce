resource "aws_security_group" "rds" {
  count       = local.env == "staging" ? 1 : 0
  name        = "${local.resource_suffix}-rds-sg"
  description = "Security group for RDS instance"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow public connections so production ECS tasks can connect
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.resource_suffix}-rds-sg"
  }
}

resource "aws_db_subnet_group" "main" {
  count      = local.env == "staging" ? 1 : 0
  name       = "${local.resource_suffix}-db-subnet-group"
  subnet_ids = [aws_subnet.public_1.id, aws_subnet.public_2.id] # Place in public subnets for public access

  tags = {
    Name = "${local.resource_suffix}-db-subnet-group"
  }
}

resource "aws_db_instance" "main" {
  count                = local.env == "staging" ? 1 : 0
  identifier           = "${local.resource_suffix}-db"
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "15"
  instance_class       = "db.t4g.micro"
  db_name              = "techmart_db"
  username             = var.db_username
  password             = var.db_password
  parameter_group_name = "default.postgres15"
  skip_final_snapshot  = true
  publicly_accessible  = true # Enable public access for shared database use

  db_subnet_group_name   = aws_db_subnet_group.main[0].name
  vpc_security_group_ids = [aws_security_group.rds[0].id]

  tags = {
    Name = "${local.resource_suffix}-db"
  }
}

# Lookup the staging DB instance in the production workspace
data "aws_db_instance" "staging" {
  count                  = local.env == "production" ? 1 : 0
  db_instance_identifier = "techmart-staging-db"
}

output "db_endpoint" {
  value = local.env == "staging" ? aws_db_instance.main[0].endpoint : data.aws_db_instance.staging[0].endpoint
}
