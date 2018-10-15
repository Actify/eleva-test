<?php
  /**
   * 
   */
  class FacilitiesListBO
  {
    
    private $conn;

    public function __construct($db){
      $this->conn = $db;
    }

    public function getAll() {
      $facilityBO = new FacilityBO($this->conn);
      
      $sql = "SELECT * ";
      $sql .= "FROM facilities f ";
      $sql .= "WHERE f.active = 1 ";
      $sql .= "ORDER BY f.name DESC";

      $result = $this->conn->query($sql);

      $rows = array();

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $row['gmaps_link'] = $facilityBO->generateGmapsLink($row['lat'], $row['lng'], $row['gmaps_id']);
          $row['gmaps_image'] = $facilityBO->generateStaticMapLink($row['lat'], $row['lng']);
          $rows[] = $row;
        }
      }

      return $rows;
    }

    public function search($str = '') {
      $facilityBO = new FacilityBO($this->conn);
      
      $sql = "SELECT * ";
      $sql .= "FROM facilities f ";
      $sql .= "WHERE f.active = 1 AND f.name LIKE '%" . $str . "%' ";
      $sql .= "ORDER BY f.name DESC";

      $result = $this->conn->query($sql);

      $rows = array();

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $row['gmaps_link'] = $facilityBO->generateGmapsLink($row['lat'], $row['lng'], $row['gmaps_id']);
          $row['gmaps_image'] = $facilityBO->generateStaticMapLink($row['lat'], $row['lng']);
          $rows[] = $row;
        }
      }

      return $rows;
    }
  }
?>