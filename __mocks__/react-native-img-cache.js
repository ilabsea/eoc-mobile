jest.mock('react-native-img-cache', () => {
  return {
    DocumentDir: () => {},
    ImageCache: {
      get: {
        clear: () => {}
      }
    }
  }
})