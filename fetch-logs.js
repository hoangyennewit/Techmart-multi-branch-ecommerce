const { CloudWatchLogsClient, GetLogEventsCommand } = require('@aws-sdk/client-cloudwatch-logs');
const client = new CloudWatchLogsClient({ region: 'ap-southeast-1' });
async function run() {
  try {
    const command = new GetLogEventsCommand({
      logGroupName: '/ecs/techmart-backend',
      logStreamName: 'ecs/backend/0e57b1965a8841e9965fb9b4dcb6f096',
      limit: 10
    });
    const response = await client.send(command);
    response.events.forEach(e => console.log(e.message));
  } catch (err) {
    console.error(err);
  }
}
run();
