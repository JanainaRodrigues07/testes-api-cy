/// <reference types="cypress" />

const dadosUsuario = require('../fixtures/usuario.json')

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request('usuarios').then((response) => {
               expect(response.status).to.equal(200),
                    expect(response.body).to.have.property('usuarios')
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let nome = dadosUsuario[0].nome
          let email = dadosUsuario[0].email
          let senha = dadosUsuario[0].password

          cy.cadastrarUsuario(nome, email, senha, "true")
               .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {

               let id = response.body.usuarios[1]._id
          })
          cy.request({
               method: 'PUT',
               url: 'usuarios/${id}',
               body: {
                    "nome": "Jose da Silva",
                    "email": "josedsilva@qa.com",
                    "password": "teste",
                    "administrador": "true"
               }
          }).then((response) => {
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it.only('Deve deletar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {

               let id = response.body.usuarios[2]._id
          })
          cy.request({
               method: 'DELETE',
               url: 'usuarios/${id}'
          }).then((response) => {
               expect(response.body.message).to.equal('Registro excluído com sucesso')
          })
     });


});
