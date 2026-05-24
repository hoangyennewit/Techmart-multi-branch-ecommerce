terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "techmart-tfstate-20260428"
    key    = "production/terraform.tfstate"
    region = "ap-southeast-1"
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  env             = terraform.workspace
  domain_name     = local.env == "production" ? "techmartvn.xyz" : "staging.techmartvn.xyz"
  api_domain_name = local.env == "production" ? "api.techmartvn.xyz" : "api-staging.techmartvn.xyz"
  resource_suffix = "${var.project_name}-${local.env}"
  db_host         = local.env == "staging" ? aws_db_instance.main[0].address : data.aws_db_instance.staging[0].address
}

variable "aws_region" {
  default = "ap-southeast-1"
}

variable "project_name" {
  default = "techmart"
}

variable "db_username" {
  default = "postgres"
}

variable "db_password" {
  description = "Database password"
  sensitive   = true
}

variable "google_client_id" {
  description = "Google OAuth Client ID"
  sensitive   = true
}

variable "google_client_secret" {
  description = "Google OAuth Client Secret"
  sensitive   = true
}


variable "gemini_api_key" {
  description = "Gemini API Key"
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT Secret"
  sensitive   = true
}

variable "vnp_tmn_code" {
  description = "VNPay TMN Code"
  sensitive   = true
}

variable "vnp_hash_secret" {
  description = "VNPay Hash Secret"
  sensitive   = true
}

variable "momo_partner_code" {
  description = "Momo Partner Code"
  sensitive   = true
}

variable "momo_access_key" {
  description = "Momo Access Key"
  sensitive   = true
}

variable "momo_secret_key" {
  description = "Momo Secret Key"
  sensitive   = true
}

variable "zalopay_key1" {
  description = "ZaloPay Key 1"
  sensitive   = true
}

variable "zalopay_key2" {
  description = "ZaloPay Key 2"
  sensitive   = true
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${local.resource_suffix}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.resource_suffix}-igw"
  }
}

resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "${local.resource_suffix}-public-1"
  }
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = data.aws_availability_zones.available.names[1]
  map_public_ip_on_launch = true

  tags = {
    Name = "${local.resource_suffix}-public-2"
  }
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "${local.resource_suffix}-private-1"
  }
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "${local.resource_suffix}-private-2"
  }
}


resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${local.resource_suffix}-public-rt"
  }
}

resource "aws_route_table_association" "public_1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_2" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.public.id
}
