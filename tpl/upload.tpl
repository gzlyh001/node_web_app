<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Upload File</title>
</head>
<body>

<style>
.container {
	max-width: 600px;
	margin: 20px auto;
	text-align: center;
}
</style>

<div class="container">

	<form method="POST" action="/upload.html?id=1" enctype="multipart/form-data">
		Name: <input type="text" name="name" value="" /><br /><br />
		File: <input type="file" name="file" /><br /><br />
		<input type="submit" name="submit" value="Upload" />
	</form>
	
</div>

</body>
</html>