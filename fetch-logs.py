import boto3
import sys

# Ensure stdout uses utf-8
sys.stdout.reconfigure(encoding='utf-8')

client = boto3.client('logs', region_name='ap-southeast-1')
response = client.get_log_events(
    logGroupName='/ecs/techmart-backend',
    logStreamName='ecs/backend/0e57b1965a8841e9965fb9b4dcb6f096',
    limit=10
)
for event in response['events']:
    print(event['message'])
