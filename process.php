<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $place = $_POST["place"];
    $time = $_POST["time"];
    $formatted_time = date('h:i A', strtotime($time));
    $date = $_POST["date"];
    $day = substr(date('l', strtotime($date)),0,3);
    echo "Place: " . $place . "<br>";
    echo "Time: " . $time . "<br>";
    echo "F Time: " . $formatted_time . "<br>";
    echo "Day: " . $day . "<br>";
}

// Connect to database
$conn = new mysqli('sql108.epizy.com', 'epiz_33911030', 'VjeLXnxRN1ejrVg', 'epiz_33911030_scouter');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from table
$sql = "SELECT s.building, s.room, MIN(hour_diff) AS min_hour_diff
        FROM (
            SELECT building, room, TIMEDIFF(STR_TO_DATE(stime, '%h:%i %p'), STR_TO_DATE('$formatted_time', '%h:%i %p')) AS hour_diff
            FROM schedule
            WHERE building = '$place' AND day = '$day' AND TIMEDIFF(STR_TO_DATE(stime, '%h:%i %p'), STR_TO_DATE('$formatted_time', '%h:%i %p')) > '00:00:00'
            ) AS s
        GROUP BY s.room
        ORDER BY min_hour_diff DESC";
$result = $conn->query($sql);
echo($result->num_rows);
// Format data as HTML table
if ($result->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>Building</th><th>Room</th><th>Time to next class</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["building"] . "</td><td>" . $row["room"] . "</td><td>" . $row["min_hour_diff"] . "</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

// Close connection
$conn->close();
?>