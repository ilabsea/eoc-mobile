# EOC Mobile
EOC Mobile is a mobile application that allows users to search for specific SOP (standard operational procedure) file and download for offline use.

# Features
- Search
- Download

# Installation

Clone the repo:
```
git clone https://github.com/ilabsea/eoc-mobile.git
```

Install all dependencies:
```
npm install
```

Link all dependencies:
```
react-native link
```

For iOS:
```
cd ios & pod install
```

# Run

On Android:
```
react-native run-android
```

On iOS:
```
react-native run-ios
```

# Environment:
```
Binaries:
  Node: 12.10.0
  Yarn: 1.17.3
  npm: 6.11.3
  Watchman: 4.9.0
SDKs:
  iOS SDK:
    Platforms: iOS 13.2, DriverKit 19.0, macOS 10.15, tvOS 13.2, watchOS 6.1
  Android SDK:
    API Levels: 28, 29
    Build Tools: 28.0.0, 28.0.3, 29.0.2
    System Images: android-28 | Intel x86 Atom_64, android-28 | Google APIs Intel x86 Atom, android-28 | Google APIs Intel x86 Atom_64
IDEs:
  Android Studio: 3.5 AI-191.8026.42.35.5791312
  Xcode: 11.2.1/11B500 - /usr/bin/xcodebuild
npmPackages:
  react: 16.8.6
  react-native: 0.60.5
```

# Firebase analytic integration
There is a firebase analytic configuration in EOC Mobile application, so it requires files replacement ```eoc-mobile/android/app/google-services.json``` for android, and ```eoc-mobile/ios/GoogleService-Info.plist``` for ios. User can get those files from [google firebase console](https://console.firebase.google.com/). For more information, read [react-native-firebase](https://github.com/invertase/react-native-firebase).
