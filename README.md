# MobileDSINADS App

Aplicativo móvel desenvolvido em React Native (Expo) para gestão de tickets de estacionamento, consumindo a API Parquímetro DSIN.

Este aplicativo foi desenvolvido para a disciplina de Fábrica de Projetos Ágeis, pelo grupo 2 da Universidade de Marília - UNIMAR.

## Tecnologias Utilizadas

*   **React Native (Expo)**
*   **TypeScript**
*   **Expo Router** (Navegação)
*   **Axios** (Integração com API)
*   **Google Maps API** (Mapas e Geolocalização)
*   **Async Storage** (Armazenamento Local)

## Arquitetura e Padrões

O projeto segue uma arquitetura modular e organizada:

*   **SOLID**: O projeto aplica princípios SOLID, como **Single Responsibility Principle (SRP)** (serviços separados por domínio) e **Interface Segregation Principle (ISP)** (definição de contratos claros em `interfaces`).
*   **Services Pattern**: A lógica de negócios e chamadas de API estão centralizadas na pasta `services` (`authService`, `vehicleService`, etc.), promovendo desacoplamento dos componentes de UI.
*   **Context API**: Gerenciamento de estado global para autenticação e dados do usuário.
*   **Componentização**: Interface de usuário construída com componentes reutilizáveis na pasta `components`.
*   **Expo Router**: Roteamento baseado em arquivos na pasta `app`.

## Funcionalidades

*   [x] **Autenticação**: Cadastro e Login de Motoristas.
*   [x] **Gestão de Perfil**: Visualização e edição de dados do motorista.
*   [x] **Gestão de Veículos**: Cadastro, edição e listagem de veículos.
*   [x] **Estacionamento**: Visualização de áreas, início e fim de período de estacionamento.
*   [x] **Saldo e Pagamentos**: Gestão de saldo e pagamentos.
*   [x] **Mapas**: Integração com Google Maps para localização.

## Como rodar o projeto

### Pré-requisitos

Para o funcionamento correto do aplicativo, é necessário que as seguintes APIs estejam rodando localmente:

1.  **Fake API de Pagamentos**: [https://github.com/RyanSR27/Fake-API-de-Pagamentos.git](https://github.com/RyanSR27/Fake-API-de-Pagamentos.git)
2.  **Parquímetro DSIN API**: [https://github.com/GabssMar/parquimetro-dsin-api.git](https://github.com/GabssMar/parquimetro-dsin-api.git)

### Rodando o App

1.  Clone o repositório.
2.  Navegue até a pasta do projeto:
    ```bash
    cd MobileDSINADS/MeuApp
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Execute o projeto:
    ```bash
    npx expo start
    ```
5.  Utilize o aplicativo Expo Go no seu celular ou um emulador Android/iOS para visualizar.
