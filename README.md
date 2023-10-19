# Environmental Reporting System (React Native With Expo Go)

This repository contains the frontend codebase for my Final Year Project, an Environmental Reporting System. This system is designed to facilitate the collection, management, and visualization of environmental data. It leverages the MERN stack (MongoDB, Express.js, React Native, and Node.js) to ensure robust performance and scalability.

[Click Here for Backend Repo](https://github.com/KolojE/FYP_Backend)

## Table of Contents

- [Objectives](#overview)
- [Features](#features)
- [Technologies/Libraries Used](#technologieslibraries-used)
- [Getting Started](#getting-started)
- [Prototype Screenshots](#prototype-screenshots)

## Overview

The purpose of this project is to create an automated reporting system that aims to help in managing the environmental incidents reporting system for the public and environmental incidents documenting system for organizations. 

## Features

- User authentication and authorization.
- Data visualization.
- Report the environmental incident.
- Track submitted report status.
- Update system setting.
- Report form customization.
- Review incident report.
- Incident report analysis.
- Generate summary report.
- In-app chat.

## Technologies/Libraries Used

- React Native with Expo Go
- react-native-maps
- Redux
- OpenStreetMap (OSM)
- [Nominatim](https://wiki.openstreetmap.org/wiki/Nominatim)
- Socket.io

## getting started
Before Setting Up The Application Please Setup the Backend First
[Link](https://github.com/KolojE/FYP_Backend))

1. Clone the repo.
```console
git clone https://github.com/KolojE/FYP_MobileApp.git
cd FYP_MobileApp
```

2. Change the API_URL environment variable in package.json.
   e.g.

```console
  "scripts": {
    "start": "API_URL='http://<backend_api_url>:8080' expo start",
    "android": "API_URL='http://<backend_api_url>:8080' expo start --android;  adb reverse tcp:8080 tcp:8080",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
```

3. Start The Development Server.

```console
npm run start
```

4. Download Expo Go in Google Play Store.

Connect to the development server in Expo Go either Manually Enter URl or Scan The QR code.
P.S. Please make sure your firewall has opened port in 19000

5. Enjoy.

## Prototype Demo
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/WgQwYk7m-fU/0.jpg)](https://www.youtube.com/watch?v=WgQwYk7m-fU)

