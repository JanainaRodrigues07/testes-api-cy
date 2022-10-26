pipeline{
    agent any 

    stages {
        stage('Clonar Repositório'){
            steps {
                git branch: 'main', url: 'https://github.com/JanainaRodrigues07/testes-api-cy.git'
            }
        }
        stage('Instalar dependencias'){
            steps {
               bat 'npm install'
            }
        }
        stage('Executar testes'){
            steps {
                bat 'npx cypress run'
            }
        }
    }
}