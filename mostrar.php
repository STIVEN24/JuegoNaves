<?php
define("host", "localhost");
define("user", "root");
define("pass", "");
define("name", "juego_naves");
$mysqli = new mysqli(host, user, pass, name);
$read = "SELECT * FROM account ORDER BY points DESC";
$data = $mysqli->query($read);
echo "
<table>
    <tr>
        <th>username</th>
        <th>points</th>
    </tr>
";
while ($row = mysqli_fetch_array($data)) {
    echo "<tr>
        <td>".$row["username"]."</td>
        <td>".$row["points"]."</td>
    </tr>";
}

echo "
</table>
";