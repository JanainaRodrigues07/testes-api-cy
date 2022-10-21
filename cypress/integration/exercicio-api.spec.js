/// <reference types="cypress" />

import contrato from '../contracts/usuarios.contracts'

const dadosUsuario = require('../fixtures/usuario.json')

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request('usuarios').then((response) => {
               expect(response.status).to.equal(200)
                    expect(response.body).to.have.property('usuarios')
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let nome = dadosUsuario[1].nome
          let email = dadosUsuario[1].email
          let senha = dadosUsuario[1].password

          cy.cadastrarUsuario(nome, email, senha, "true")
               .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               })
     });

     it('Deve validar um usuário com email inválido', () => {
          let nome = dadosUsuario[0].nome
          let email = dadosUsuario[0].email
          let senha = dadosUsuario[0].password

          cy.cadastrarUsuario(nome, email, senha, "true")
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.body.message).to.equal('Este email já está sendo usado')
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let nome = dadosUsuario[2].nome
          let email = dadosUsuario[2].email
          let senha = dadosUsuario[2].password

          cy.cadastrarUsuario(nome, email, senha, "true")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'PUT',
                         url: `usuarios/${id}`,
                         body: {
                              "nome": "Joao Lima",
                              "email": "joao_lima10@qa.com",
                              "password": "teste",
                              "administrador": "true"
                         }
                    })

               }).then((response) => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
               })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let nome = dadosUsuario[3].nome
          let email = dadosUsuario[3].email
          let senha = dadosUsuario[3].password

          cy.cadastrarUsuario(nome, email, senha, "true")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'DELETE',
                         url: `usuarios/${id}`,
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                         expect(response.status).to.equal(200)
                    })
               })
     });
     
});
