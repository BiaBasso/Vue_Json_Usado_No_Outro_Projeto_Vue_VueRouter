<template>

    <!--Modal -->
    <!--<div class="modal fade" id="delete-modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" :class="{'active': showModal}">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="modalLabel">Excluir Livro</h4>
            </div>
            <div class="modal-body">
                Deseja realmente excluir este livro?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" @click.prevent="removeBook(book)">Sim</button>
                <button type="button" class="btn btn-info" data-dismiss="modal" @click.prevent="showModal = false">Não</button>
            </div>
            </div>
        </div>
    </div> -->
    <!-- /.modal -->

    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
        <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Livraria Ler é Bom</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Início</a></li>
            <li><a href="#">Opções</a></li>
            <li><a href="#">Perfil</a></li>
            <li><a href="#">Ajuda</a></li>
        </ul>
        </div>
        </div>
    </nav>
<!-- Fim do menu -->

    <div id="main" class="container-fluid">
        <h3 class="page-header">Listagem</h3>

        <div id="top" class="row">

            <div class="col-md-3">
                <h3>Livros</h3>
            </div>
        
            <div class="col-md-6">
                <div class="input-group h2">
                    <input name="search" class="form-control" id="search" type="text" placeholder="Pesquisar Livros" v-model="search">
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="submit" @click.prevent="searchBooks">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>
            </div>
        
            <div class="col-md-3">
                <a class="btn btn-primary pull-right h2" @click.prevent="createBooks()">Novo Livro</a>
            </div>
    
        </div> <!-- /#top -->
    
        <hr />
        <div id="list" class="row">

            <div class="table-responsive col-md-12">
                <table class="table table-striped" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th class="actions">Ações</th>
                            <th>ID</th>
                            <th>Título</th>
                            <th>ISBN</th>
                            <th>Emprestado</th>
                            <th>Número de Páginas</th>
                            <th>Valor</th>                        
                        </tr>
                    </thead>
                    <tbody>
        
                        <tr v-for="book in books">
                            <td class="actions">
                                <a class="btn btn-success btn-xs" href="#" @click.prevent="viewBooks(book)">Visualizar</a>
                                <a class="btn btn-warning btn-xs" href="#" @clicl.prevent="editBooks(book)">Editar</a>
                                <a class="btn btn-danger btn-xs"  href="#" @click.prevent="removeBooks(book)">Excluir</a>
                            </td>
                            <td>{{ book.id }}</td>
                            <td>{{ book.titulo }}</td>
                            <td>{{ book.isbn }}</td>
                            <td>{{ book.emprestado }}</td>
                            <td>{{ book.numPaginas }}</td>
                            <td>{{ book.valor | currency }}</td>                        
                        </tr>
        
                    </tbody>
                </table> 
            </div>
        
        </div> <!-- /#list -->
    
        <div id="bottom" class="row">
        
            <pagination :total="total" :page="page" :itens-per-page="itensPerPage" @change-page="onChangePage"></pagination>

        </div> <!-- /#bottom -->   
    </div>
</template>

<script>

import Pagination from './pagination.vue'

    export default {
        components: {
            Pagination
        },

        data() {
            return {
                search: '',
                books: [],
                page: 1,
                total: 0,
                itensPerPage: 5,                
            }
        },

        methods: {
            onChangePage(page){
                let self = this;

                self.page = page;
                self.loadBooks();
            },

            loadBooks() {
                let self = this;

                let start = (self.page * self.itensPerPage) - (self.itensPerPage - 1)
                let end = self.page * self.itensPerPage
                let qSearch = "";

                if(self.search){
                    qSearch = `&q=${self.search}`
                }

                self.$http.get(`http://localhost:3000/livros?_start=${start}&_end=${end}${qSearch}`)
                    .then(
                        function(response) {
                            self.books = response.body;
                            self.total = response.headers.get('X-Total-Count')                            
                        },
                        function (error) {
                            console.log(error)
                        }
                    )
            },

            editBooks(book) {
                let self = this;

                self.$http.put("http://localhost:3000/livros/" + book.id)
                    .then(

                    )
            },

            createBooks(){
                let self = this;
            },

            removeBooks(book){
                let self = this;

                swal({
                    title: "Você tem certeza?",
                    text: `Deseja apagar "${book.titulo}"`,   
                    type: "warning",                      
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim, pode apagar!",   
                    cancelButtonText: "Cancelar",                    
                    showLoaderOnConfirm: true,
                    showCancelButton: true,    
                    closeOnConfirm: false },

                function(){   
                    self.$http.delete(`http://localhost:3000/livros/${book.id}`)
                        .then(
                            function(result) {
                            swal("Livro removido!")
                            self.loadBooks()
                        }) 
                });
            },

            searchBooks() {
                let self = this;

                self.loadBooks();
            },
        },

        created() {
            let self = this;

            self.loadBooks();
        },
    }
</script>