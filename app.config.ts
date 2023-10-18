module.exports = {
    name: 'MyApp',
    version: '1.0.0',
    extra: {
      apiUrl: process.env.API_URL,
      "eas":{
        "projectId": "63e55b95-fee5-4f68-a114-05c84849eea7"
      }
    },
    android: {
      "package": "com.yourcompany.yourappname",
      "versionCode": 1
    }

  };
  