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

	<form method="POST" action="/form.html?id=1">
		Name: <input type="text" name="name" value="" /><br /><br />
		Age: <input type="text" name="age" value="" /><br /><br />
		Gender:
		<select name="gender">
			<option value="Male">Male</option>
			<option value="Female">Female</option>
		</select><br /><br />
		<input type="submit" name="submit" value="Submit" />
	</form>
	
</div>

</body>
</html>