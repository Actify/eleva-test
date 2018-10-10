<?php
  /**
   * 
   */
  class PersonBO
  {
    
    private $conn;

    public function __construct($db){
      $this->conn = $db;
    }

    public function create($person) {
      if(isset($person)) {
        $person['active'] = 1;
        $person['available'] = 1;
        $person['creation_date'] = sqlDate();
        $person['update_date'] = sqlDate();

        $this->conn->insert('people', $person);

        $id = $this->conn->getLastInsertId();

        return $this->get($id);
      }      
    }

    public function update($person_id, $person) {
      if(isset($person) && $this->exist($person_id)) {
        unset($person['id']);
        unset($person['creation_date']);

        $person['id'] = $person_id;
        $person['update_date'] = sqlDate();

        $result = $this->conn->update('people', $person, array('id'));

        return $this->get($person_id);
      }      
    }

    public function get($person_id) {
      $sql = "SELECT * ";
      $sql .= "FROM people p ";
      $sql .= "WHERE p.id = $person_id";

      $result = $this->conn->query($sql);

      if($row = $result->fetch_assoc()) {
        $row['facilities'] = $this->getAssociatedFacilities($row['id']);
        return $row;
      }
    }

    public function delete($person_id) {
      $sql1 = "DELETE FROM people WHERE id = $person_id";
      $this->conn->query($sql1);

      $sql = "DELETE FROM facility_staff WHERE person_id = $person_id";
      $this->conn->query($sql);

      return true;
    }

    public function getAssociatedFacilities($person_id) {
      $sql = "SELECT f.id, f.name, f.photo_url, ";
      $sql .= "(SELECT fr.description FROM facility_staff fs INNER JOIN facility_roles fr ON fr.id = fs.role_id WHERE fs.facility_id = f.id AND fs.person_id = $person_id) AS staff_role ";
      $sql .= "FROM facilities f ";
      $sql .= "WHERE f.id IN(SELECT fs.facility_id FROM facility_staff fs WHERE fs.person_id = $person_id) AND f.active = 1 ";
      $sql .= "ORDER BY f.name DESC";

      $result = $this->conn->query($sql);

      $rows = array();

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $rows[] = $row;
        }
      }

      return $rows;
    }

    public function removeAssociatedFacility($person_id, $facility_id) {
      $sql = "DELETE FROM facility_staff WHERE person_id = $person_id AND facility_id = $facility_id";
      return $this->conn->query($sql);
    }

    private function exist($person_id) {
      $sql = "SELECT p.id FROM people p WHERE p.id = $person_id";
      $result = $this->conn->query($sql);

      if($row = $result->fetch_assoc()) {
        return true;
      } else {
        return false;
      }
    }
  }
?>