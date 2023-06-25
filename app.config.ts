module.exports = {
    name: 'MyApp',
    version: '1.0.0',
    extra: {
      apiUrl: process.env.API_URL,
      "eas":{
        "projectId": "f4dc222f-a17a-4e14-b865-37503cde552a"
      }
    },
    android: {
      "package": "com.yourcompany.yourappname",
      "versionCode": 1
    }

  };
  