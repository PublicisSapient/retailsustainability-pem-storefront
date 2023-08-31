# P2P-Exchange-Marketplace-UI

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is the mono-repo for the P2P-Marketplace UI created using Nx.

## Table of Contents

- [Requirements](#requirements)
- [Tools and Technologies](#toolsandtechnologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [License](#license)

## Requirements

- React >= 18.0.0
- @nrwl/react >= 15.9.2
- Nx >= 15.8.1
- Typescript >= 4.9.5
- Material-UI >= 5.12.1
- @nrwl/jest >= 15.9.2

## Tools and Technologies

![](https://img.shields.io/badge/Code-Typescript-informational?style=flat&logo=Typescript&logoColor=white&color=FE414D)
![](https://img.shields.io/badge/Lib-React-informational?style=flat&logo=react&logoColor=white&color=FE414D)
![](https://img.shields.io/badge/Lib-Redux-informational?style=flat&logo=Redux&logoColor=white&color=FE414D)
![](https://img.shields.io/badge/Lib-Thunk-informational?style=flat&logo=redux&logoColor=white&color=FE414D)
![](https://img.shields.io/badge/Lib-MaterialUI-informational?style=flat&logo=mui&logoColor=white&color=FE414D)
![](https://img.shields.io/badge/Framework-Nx-%23AA83C8?style=flat&logo=nx&logoColor=white&color=FE414D)
![](https://img.shields.io/badge/Tool-VsCode-%23AA83C8?style=flat&logo=Visual-Studio-Code&logoColor=white&color=FE414D)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PublicisSapient/retailsustainability-pem-storefront.git
   ```

1. Change the current working directory to the repository:

   ```bash
   cd storefront
   ```

1. Install the dependencies:

   ```bash
   npm install or yarn install
   ```

## Usage

1. To start the application in development mode, use the following command:

   ```bash
   nx serve shell --devRemotes=product-detail,product-list,home
   ```

2. To start the application in production mode, use the following command:

   ```bash
   nx run shell:serve --configuration=production
   ```

3. To test the application:

   ```bash
   nx run shell:test
   ```

## Contributions

Contributions to the P2P-Marketplace-UI are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-new-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-new-feature`.
5. Submit a pull request.

## License

The P2P-Marketplace-UI is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

Feel free to modify and adapt the code to suit your needs.
