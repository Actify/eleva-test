<?php
  /**
   * 
   */
  class PeopleListBO
  {
    
    private $conn;

    public function __construct($db){
      $this->conn = $db;
    }

    public function getAll() {
      $personBO = new PersonBO($this->conn);

      $sql = "SELECT * ";
      $sql .= "FROM people p ";
      $sql .= "WHERE p.active = 1 ";
      $sql .= "ORDER BY p.name ASC";

      $result = $this->conn->query($sql);

      $rows = array();

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $row['facilities'] = $personBO->getAssociatedFacilities($row['id']);
          $rows[] = $row;
        }
      }

      return $rows;
    }
  }
?>