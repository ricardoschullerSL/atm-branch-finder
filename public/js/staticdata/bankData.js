export const BANKDATA = [
    {   
        id:"Halifax", 
        uris: {
            atms:"https://api.halifax.co.uk/open-banking/v1.2/atms",
            branches:"https://api.halifax.co.uk/open-banking/v1.2/branches",
            pca:"https://api.halifax.co.uk/open-banking/v1.2/personal-current-accounts"
        },
        atms: {expirationDate: null, data:[]},
        branches: {expirationDate: null, data:[]},
        pca: {expirationDate: null, data:[]}
        
    },
    {
        id:"Barclays", 
        uris: {
            atms:"https://atlas.api.barclays/open-banking/v1.3/atms",
            branches:"https://atlas.api.barclays/open-banking/v1.3/branches",
            pca:"https://atlas.api.barclays/open-banking/v1.3/personal-current-accounts"
        },
        atms: {expirationDate: null, data:[]},
        branches: {expirationDate: null, data:[]},
        pca: {expirationDate: null, data:[]},
    },
    {
        id:"RBS", 
        uris: {
            atms:"https://openapi.rbs.co.uk/open-banking/v1.2/atms",
            branches:"https://openapi.rbs.co.uk/open-banking/v1.2/branches",
            pca:"https://openapi.rbs.co.uk/open-banking/v1.2/personal-current-accounts"
        },
        atms: {expirationDate: null, data:[]},
        branches: {expirationDate: null, data:[]},
        pca: {expirationDate: null, data:[]},
    },
    {
        id:"Danske Bank",
        uris: {
            atms:"https://obp-api.danskebank.com/open-banking/v1.2/atms",
            branches:"https://obp-api.danskebank.com/open-banking/v1.2/branches",
            pca:"https://obp-api.danskebank.com/open-banking/v1.2/personal-current-accounts"
        },
        atms: {expirationDate: null, data:[]},
        branches: {expirationDate: null, data:[]},
        pca: {expirationDate: null, data:[]},
    },
    {
        id:"NatWest",
        uris: {
            atms:"https://openapi.natwest.com/open-banking/v1.2/atms",
            branches:"https://openapi.natwest.com/open-banking/v1.2/atms",
            pca:"https://openapi.natwest.com/open-banking/v1.2/personal-current-accounts"
        },
        atms: {expirationDate: null, data:[]},
        branches: {expirationDate: null, data:[]},
        pca: {expirationDate: null, data:[]},
    },
    {
        id:"Nationwide",
        uris: {
            atms:"https://openapi.nationwide.co.uk/open-banking/v1.2/atms",
            branches:"https://openapi.nationwide.co.uk/open-banking/v1.2/branches",
            pca:"https://openapi.nationwide.co.uk/open-banking/v1.2/personal-current-accounts"
        },
        atms: {expirationDate: null, data:[]},
        branches: {expirationDate: null, data:[]},
        pca: {expirationDate: null, data:[]},
    }
];