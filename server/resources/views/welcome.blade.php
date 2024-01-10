<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link href="{{ asset('bootstrap5/css/bootstrap.css')}}" rel="stylesheet" />
    <link href="{{ asset('bootstrap5/js/bootstrap.js')}}" rel="stylesheet" />
    <link href="{{ asset('assets/css/main.css')}}" rel="stylesheet" />

    <!-- Styles -->

</head>

<body>
    <div class="app d-flex align-items-center flex-column">
        <header class="container-fluid mw-1200">
            <h2 class="mt-5" style="color: #1b2c95; font-weight: 700;">HOU Scientific Research Information System</h2>
        </header>
        <div class="container-fluid mw-1200 mt-5">
            <div class="d-flex flex-column">
                <div class="title w-100">
                    <h4>API USER</h4>
                </div>
                <div class="content mt-2">
                    <ul class="p-0 m-0">
                        <li class="content-item ">
                            <div class="d-flex align-items-center">
                                <button class="btn content-button get m-2">GET</button>
                                <span><a href="#">https://localhost:7158/</a></span>
                            </div>
                            <div class="m-2">
                                <textarea class="w-100">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</textarea>
                            </div>
                        </li>
                        <li class="content-item ">
                            <div class="d-flex align-items-center">
                                <button class="btn content-button post m-2">POST</button>
                                <span><a href="#">https://localhost:7158/</a></span>
                            </div>
                            <div class="m-2">
                                <textarea class="w-100">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</textarea>
                            </div>
                        </li>
                        <li class="content-item ">
                            <div class="d-flex align-items-center">
                                <button class="btn content-button put m-2">PUT</button>
                                <span><a href="#">https://localhost:7158/</a></span>
                            </div>
                            <div class="m-2">
                                <textarea class="w-100">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</textarea>
                            </div>
                        </li>
                        <li class="content-item ">
                            <div class="d-flex align-items-center">
                                <button class="btn content-button delete m-2">DELETE</button>
                                <span><a href="#">https://localhost:7158/</a></span>
                            </div>
                            <div class="m-2">
                                <textarea class="w-100">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</textarea>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- <img src="https://drive.google.com/uc?id=10v2tQyiNVxHvLt2stVEKTQdmWyNRcfRy" alt="ảnh" style="width:100px;"> -->
</body>

</html>