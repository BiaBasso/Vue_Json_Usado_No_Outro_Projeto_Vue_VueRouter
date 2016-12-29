<template>

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
    <!--Fim do menu-->

<div id="main" class="container-fluid">
    <h3 class="page-header">Adicionar Livros</h3>

    <form action="index.html">
        <div class="row">
            <div class="form-group col-md-12">
                <label for="campo1">Título</label>
                <input type="text" class="form-control" id="titulo" v-model="book.titulo">
            </div>
            
            <div class="form-group col-md-6">
                <label for="campo2">ISBN</label>
                <input type="text" class="form-control" id="isbn" v-model="book.isbn">
            </div>
            
            <div class="form-group col-md-6">
                <label for="campo3">Emprestado</label>
                <select class="form-control" id="emprestado" v-model="book.emprestado">
                    <option value=""></option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>                
                </select>
            </div>

            <div class="form-group col-md-6">
                <label for="campo3">Número de Páginas</label>
                <input type="text" class="form-control" id="numero-paginas" v-model="book.numPaginas">
            </div>

            <div class="form-group col-md-6">
                <label for="campo3">Valor</label>
                <input type="text" class="form-control" id="valor" v-model="book.valor">
            </div>
        </div>
        
        <hr />
        <div id="actions" class="row">
            <div class="col-md-12">
            <button type="submit" class="btn btn-primary" @click.prevent="saveBooks()" :disabled="!isValidToSave">Salvar</button>
            <a class="btn btn-default" @click.prevent="backToSearch()">Voltar</a>
            </div>
        </div>
    </form>


</div>

</template>

<script>
    export default {
        data() {
            return {
                book: {
                    titulo: '',
                    isbn: 0,
                    emprestado: '',
                    numPaginas: 0,
                    valor: 0
                },                
            }
        },

        computed: {
            isValidToSave: function() {
                let self = this;

                return self.book.titulo &&
                        self.book.isbn &&
                        self.book.emprestado &&
                        self.book.numPaginas &&
                        self.book.valor
            }
        },

        methods: {
            saveBooks() {
                let self = this;

                self.$http.post("http://localhost:3000/livros", self.book)
                    .then(
                        function(response) {
                            swal("Adicionado com Sucesso!")

                            self.book = {}
                        },
                        function(error) {
                            swal("Ops... Houve um problema!")
                            console.log(error)
                        }
                    )
            },

            backToSearch() {
                let self = this; // verificar
            },
        },

    }
</script>