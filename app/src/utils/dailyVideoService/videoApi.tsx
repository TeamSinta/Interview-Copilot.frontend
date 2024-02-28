// Define your module's exports with a named default export
const RoomService = {
  async createRoom(duration = 120) {
    const exp = Math.round(Date.now() / 1000) + 60 * duration;
    const options = {
      properties: {
        exp,
        enable_recording: 'cloud',
        recordings_bucket: {
          bucket_name: 'team-sinta',
          bucket_region: 'eu-west-1',
          assume_role_arn: 'arn:aws:iam::314160095310:role/BucketRole',
          allow_api_access: true,
        },
      },
    };

    const VITE_DAILY_API_KEY = import.meta.env.VITE_DAILY_API_KEY;

    const response = await fetch('https://api.daily.co/v1/rooms/', {
      method: 'POST',
      body: JSON.stringify(options),
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${VITE_DAILY_API_KEY}`,
      },
    });

    return await response.json();
  },

  async finishMeeting(recordingId: string) {
    const VITE_DAILY_API_KEY = import.meta.env.VITE_DAILY_API_KEY;

    const response = await fetch(
      `https://api.daily.co/v1/recordings/${recordingId}/access-link`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${VITE_DAILY_API_KEY}`,
        },
      }
    );
    const resp = await response.json();
    return resp;
  },
};

export default RoomService; // Export the named default export
