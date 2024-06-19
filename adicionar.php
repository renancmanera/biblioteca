<?php
    if(isset($_POST['submit']))
    {
        include_once('config.php');

        // Get the form data, including the book ID
        $idlivros = $_POST['idlivros']; // Captura o ID do livro do formulário
        $nome = $_POST['nome'];
        $autor = $_POST['autor'];
        $data = $_POST['data'];

        // Perform the database query including the book ID
        $result = mysqli_query($conexao, "INSERT INTO livros(idlivros, nome, autor, data) VALUES('$idlivros', '$nome', '$autor', '$data')");
        
        if($result) {
            echo "Livro adicionado com sucesso!";
        } else {
            echo "Erro ao adicionar livro: " . mysqli_error($conexao);
        }
    }
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="form.css">
    <script src="header.js"></script>
</head>
<body>
    <?php ?>
    <nav id="sidebar">
        <div id="sidebar_content">
            <div id="user">
                <img src="avatar.avif" id="user_avatar">
                <style>
                    #user_avatar {
                        width: 70px; /* Ajuste este valor conforme necessário */
                        height: 70px; /* Certifique-se de que a altura e a largura sejam iguais */
                        border-radius: 50%; /* Torna a imagem redonda */
                        object-fit: cover; /* Garante que a imagem se ajuste bem dentro do contêiner */
                        margin-right: 20px;
                    }
                </style>
                <p id="user_infos">
                    <span class="item-description">
                        Funcionário
                    </span>
                </p>
            </div>
    
            <ul id="side_items">
                <li class="side-item active">
                    <a href="#">
                        <i class="fa-solid fa-chart-line"></i>
                        <span class="manter-livros">
                            Manter livros
                        </span>
                    </a>
                </li>
    
                <li class="side-item">
                    <a href="cadastro.html">
                        <i class="fa-solid fa-user"></i>
                        <span class="item-description">
                            Cadastrar usuário
                        </span>
                    </a>
                </li>
    
                <li class="side-item">
                    <a href="#">
                        <i class="fa-solid fa-bell"></i>
                        <span class="item-description">
                            Editar usuários
                        </span>
                    </a>
                </li>
    
                <li class="side-item">
                    <a href="#">
                        <i class="fa-solid fa-box"></i>
                        <span class="item-description">
                            Registrar empréstimo
                        </span>
                    </a>
                </li>
    
                <li class="side-item">
                    <a href="#">
                        <i class="fa-solid fa-image"></i>
                        <span class="item-description">
                            Editar empréstimos
                        </span>
                    </a>
                </li>
    
                <li class="side-item">
                    <a href="#">
                        <i class="fa-solid fa-gear"></i>
                        <span class="item-description">
                            Eventos
                        </span>
                    </a>
                </li>

                <li class="side-item">
                    <a href="#">
                        <i class="fa-solid fa-gear"></i>
                        <span class="item-description">
                            Multas
                        </span>
                    </a>
                </li>

                <li class="side-item">
                    <a href="#">
                        <i class="fa-solid fa-gear"></i>
                        <span class="item-description">
                            Relatório de estoque
                        </span>
                    </a>
                </li>
            </ul>
    
            <div id="logout">
                <a href="login.html"> <button id="logout_btn">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span class="item-description"> 
                        Logout 
                    </span>
                </button> </a>
            </div>
           
        </div>
    </nav>
    
    <main>
            <div class="card">
                <h1 class="gradient-text">Adicionar livros</h1>
                <div class="output">
                    
                    <form action="adicionar.php" method="POST">

                    <input type="text" name="idlivros" required>
                    <div class="form-group" id="group-book-name">
                        <label for="book-name" id="label-book-name">Nome do Livro:</label>
                        <input name= "nome" type="text" id="book-name" name="book-name" required>
                    </div>
                    <div class="form-group" id="group-author-name">
                        <label for="author-name" id="label-author-name">Autor:</label>
                        <input name= "autor" type="text" id="author-name" name="author-name" required>
                    </div>
                    <div class="form-group" id="group-publication-date">
                        <label for="publication-date" id="label-publication-date">Data de Publicação:</label>
                        <input name= "data" type="date" id="publication-date" name="publication-date" required>
                    </div>
                    
                </div>
                <div class="input-area">
             
                <input name= "submit" type="submit" value="Cadastrar">
                </div>
</form>

                <p id="voltar"><a href="header.html">Voltar</a></p>

            </div> 
        </main>
</body>
</html>

