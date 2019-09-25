const data = [
    {
      _source: {
        id: 1,
        document_type: 'document',
        name: 'Decease Outbreak',
        items: [
          {
            id: '1',
            desc: 'lorem ipsum 1'
          },
          {
            id: '2',
            desc: 'lorem ipsum 1'
          }
        ],
        description:
          'a brief description of H5N1 \n a brief description of H5N1 \n a brief description of H5N1 \n a brief description of H5N1 \n ',
      },
      highlight: {
        name: ["<em class='highlight'>decease<\/em>"]
      }
    },
    {
      _source: {
        id: 2,
        document_type: 'folder',
        name: 'Human',
        items: [
          {
            id: '1',
            desc: 'lorem ipsum 1'
          },
          {
            id: '2',
            desc: 'lorem ipsum 1'
          }
        ],
        description:
          'a brief description of Influenza \n a brief description of Influenza \n a brief description of Influenza \n a brief description of Influenza \n ',
      },
      highlight: {
        name: ["<em class='highlight'>human<\/em>"]
      }
    },
    {
      _source: {
        id: 3,
        document_type: 'document',
        name: 'Animal',
        items: [
          {
            id: '1',
            desc: 'lorem ipsum 1'
          },
          {
            id: '2',
            desc: 'lorem ipsum 1'
          }
        ],
        description: 'BUNDLE  [Anz, dev] ./index.j',
      },
      highlight: {
        name: ["<em class='highlight'>animal<\/em>"]
      }
    },
    {
      _source: {
        id: 4,
        document_type: 'document',
        name: 'Environment',
        items: [
          {
            id: '1',
            desc: 'lorem ipsum 1'
          },
          {
            id: '2',
            desc: 'lorem ipsum 1'
          }
        ],
        description: 'BUNDLE  [Anz, dev] ./index.j',
      },
      highlight: {
        name: ["<em class='highlight'>environment<\/em>"]
      }
    },
    {
      _source: {
        id: 5,
        document_type: 'document',
        name: 'Cross Border',
        items: [
          {
            id: '1',
            desc: 'lorem ipsum 1'
          },
          {
            id: '2',
            desc: 'lorem ipsum 1'
          }
        ],
        description: 'BUNDLE  [Anz, dev] ./index.j',
      },
      highlight: {
        name: ["<em class='highlight'>cross<\/em>"]
      }
    },
  ];

  export { data }