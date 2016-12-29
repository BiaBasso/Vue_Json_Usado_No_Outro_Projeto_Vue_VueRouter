<template>

    <!-- Modal -->
<!--<div class="modal fade" id="delete-modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="modalLabel">Excluir Item</h4>
        </div>
        <div class="modal-body">
            Deseja realmente excluir este item?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Sim</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Não</button>
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
    <!--Fim do menu-->

<div id="main" class="container-fluid">
    <h3 class="page-header">Visualizar {{ book.id }}</h3>

    <div class="row">
        <div class="col-md-4">
            <p><strong>Id</strong></p>
            <p>{{ book.id }}</p>
        </div>

        <div class="col-md-4">
            <p><strong>Título</strong></p>
            <p>{{ book.titulo }}</p>
        </div>

        <div class="col-md-4">
            <p><strong>ISBN</strong></p>
            <p>{{ book.isbn }}</p>
        </div>

        <div class="col-md-4">
            <p><strong>Emprestado</strong></p>
            <p>{{ book.emprestado }}</p>
        </div> 

        <div class="col-md-4">
            <p><strong>Número de Páginas</strong></p>
            <p>{{ book.numPaginas }}</p>
        </div>

        <div class="col-md-4">
            <p><strong>Valor</strong></p>
            <p>{{ book.valor }}</p>
        </div> 
    </div>

    <hr />
    <div id="actions" class="row">
        <div class="col-md-12">
            <a href="edit.vue" class="btn btn-primary" @click.prevent="editBook(book)">Editar</a>
            <a href="#" class="btn btn-danger" @click.prevent="removeBook(book)">Excluir</a>
            <a href="list.vue" class="btn btn-default" @click.prevent="backToSearch()">Voltar</a>
        </div>
    </div>    
</div>

</template>

<script>
    export default {
        data() {
            return {
                book: {}
            }
        },

        created() {
            let self = this;
        },

        methods: {
            removeBook(book){
                let self = this;

                swal({
                    title: "Você tem certeza?",
                    text: `Deseja apagar "${book.titulo}"`,   
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Sim, pode apagar!",   
                    cancelButtonText: "Cancelar",                    
                    showLoaderOnConfirm: true,   
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

            // editBook(book): { // verificar
            //     let self = this;

            //     self.$http.push("http://localhost:3000/livros/" + self.book.id)
            // },

            // backToSearch() { // verificar
            //     let self = this;
            // },
        },

    }
</script>