<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Leo's nodeJS web framework</title>
</head>
<body>

<style>
.container {
	max-width: 600px;
	margin: 20px auto;
	text-align: center;
}
.item {
	display: table;
	width: 100%;
	border: 1px solid #666;
}
.item span {
	display: table-cell;
	text-align: left;
	padding: 10px 20px;
}
.name {
	width: 100px;
}
</style>

<div class="container">

	<h1>nodeJS web framework</h1>
	
	<div class="item">
		<span class="name">Home: </span>
		<span><a href="/">/</a></span>
	</div>
	<div class="item">
		<span class="name">Blocking: </span>
		<span><a href="/blocking.html">/blocking.html</a></span>
	</div>
	<div class="item">
		<span class="name">Show Image: </span>
		<span><a href="/show.html">/show.html</a></span>
	</div>
	<div class="item">
		<span class="name">Upload File: </span>
		<span><a href="/upload.html">/upload.html</a></span>
	</div>
</div>

</body>
</html>