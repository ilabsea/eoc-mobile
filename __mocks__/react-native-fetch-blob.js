import { NativeModules } from 'react-native';
NativeModules.RNFetchBlob = {
  DocumentDir: ''
}

const existsMock = jest.fn();
existsMock.mockReturnValueOnce({then: jest.fn()});

global.self = {}

export default {
    DocumentDir: () => {},
    ImageCache: {
        get: {
            clear: () => {},
        },
    },
    fs: {
        exists: existsMock,
        dirs: {
            MainBundleDir: () => {},
            CacheDir: () => {},
            DocumentDir: () => {},
        },
    },
};