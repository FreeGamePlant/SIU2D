<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    echo "POST recebido!";
} else {
    echo "GET recebido!";
}
?>