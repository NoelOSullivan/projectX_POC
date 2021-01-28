# ProjectX_POC

### Description
- An application for creating and controlling real time animation on a device via one or multiple client devices, using multiple graphic sources of multiple types

### Use cases
- Live shows
- Video creation/ recording
- Games

### Environment
- Backend
  - Express JS
- Frontend
  - Vanilla, anything goes
  - WebRTC for the peer communication, via peer.js
  
### Installation
  - Clone repo
  - npm install
  - npm run start
  
### Testing
  - Make sure devices on the same WIFI
  - Master device : localhost:3000 - Login as Host
  - Client device : [ip address of host]:3000 - Login as client
  
### Known problems
  - Chrome : android
    - Loses gyroscope functionality - Fix by desactivation CHROME app and reactivating
  
