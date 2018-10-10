<?php
  /**
   * 
   */
  class FacilityBO
  {
    
    private $conn;

    public function __construct($db){
      $this->conn = $db;
    }

    public function create($insert) {
      if(isset($insert)) {
        $insert['active'] = 1;
        $insert['creation_date'] = sqlDate();
        $insert['update_date'] = sqlDate();

        if(isset($insert['roles'])) {
          $roles = $insert['roles'];
          unset($insert['roles']);
        }

        $this->conn->insert('facilities', $insert);

        $id = $this->conn->getLastInsertId();

        if(isset($roles)) {
          foreach ($roles as $key => $value) {
            $this->addRole($id, $value);
          }
        }

        return $this->get($id);
      }      
    }

    public function update($facility_id, $update) {
      if(isset($update) && $this->exist($facility_id)) {
        unset($update['id']);
        unset($update['creation_date']);

        $update['id'] = $facility_id;
        $update['update_date'] = sqlDate();

        if(isset($update['roles'])) {
          $roles = $update['roles'];
          unset($update['roles']);
        }

        $result = $this->conn->update('facilities', $update, array('id'));

        if(isset($roles)) {
          foreach ($roles as $key => $value) {
            if(isset($value['id'])) {
              $this->updateRole($facility_id, $value['id'], $value);
            } else {
              $this->addRole($facility_id, $value);
            }            
          }
        }

        return $this->get($facility_id);
      }      
    }

    public function get($facility_id) {
      $sql = "SELECT * ";
      $sql .= "FROM facilities f ";
      $sql .= "WHERE f.id = $facility_id";

      $result = $this->conn->query($sql);

      if($row = $result->fetch_assoc()) {
        $row['roles'] = $this->getRoles($row['id']);
        $row['staff'] = $this->getStaff($row['id']);
        $row['gmaps_link'] = $this->generateGmapsLink($row['lat'], $row['lng'], $row['gmaps_id']);
        $row['gmaps_image_small'] = $this->generateStaticMapLink($row['lat'], $row['lng'], 160, 160);
        $row['gmaps_image_large'] = $this->generateStaticMapLink($row['lat'], $row['lng'], 400, 200);
        return $row;
      }
    }

    public function getRoles($facility_id) {
      $sql = "SELECT * ";
      $sql .= "FROM facility_roles fr ";
      $sql .= "WHERE fr.facility_id = $facility_id ";// OR ISNULL(fr.facility_id) ";
      $sql .= "ORDER BY fr.description DESC";

      $result = $this->conn->query($sql);

      $rows = array();

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $rows[] = $row;
        }
      }

      return $rows;
    }

    public function addRole($facility_id, $role) {
      if(isset($role) && isset($role['description']) && $role['description'] != '') {
        $role['facility_id'] = $facility_id;
        $this->conn->insert('facility_roles', $role);
      }
    }

    public function updateRole($facility_id, $role_id, $role) {
      if(isset($role) && isset($role['description']) && $role['description'] != '') {
        $role['id'] = $role_id;
        $role['facility_id'] = $facility_id;

        $result = $this->conn->update('facility_roles', $role, array('id'));
      }
    }

    public function getStaff($facility_id) {
      $sql = "SELECT fs.id, fs.assignment_date, fs.active, p.name, p.surname, p.email, p.address, p.photo_url, p.available, fr.description AS role_label, fr.color AS role_color ";
      $sql .= "FROM facility_staff fs ";
      $sql .= "INNER JOIN people p ON p.id = fs.person_id ";
      $sql .= "LEFT JOIN facility_roles fr ON fr.id = fs.role_id ";
      $sql .= "WHERE fs.facility_id = $facility_id AND fs.active = 1 ";
      $sql .= "ORDER BY p.name ASC";

      $result = $this->conn->query($sql);

      $rows = array();

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $rows[] = $row;
        }
      }

      return $rows;
    }

    public function addStaffMember($facility_id, $staff_member) {

      if(isset($staff_member['person_id'])) {

        //controllo che non sia stata già inserita la stessa persona
        $sql = "SELECT fs.id  FROM facility_staff fs WHERE fs.person_id = ".$staff_member['person_id']. " AND fs.facility_id = $facility_id";
        $result = $this->conn->query($sql);

        if(!$row = $result->fetch_assoc()) {

          $staff_member['facility_id'] = $facility_id;
          $staff_member['active'] = 1;
          $staff_member['assignment_date'] = sqlDate();

          $this->conn->insert('facility_staff', $staff_member);

          return $this->conn->getLastInsertId();
        }
      }
    }

    public function getUnlistedPeople($facility_id) {
      $sql = "SELECT p.id, p.name, p.surname, p.email, p.address, p.photo_url, p.available ";
      $sql .= "FROM people p ";
      $sql .= "WHERE p.id NOT IN (SELECT fs.person_id FROM facility_staff fs WHERE fs.facility_id = $facility_id)";

      $result = $this->conn->query($sql);

      $rows = array();

      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $rows[] = $row;
        }
      }

      return $rows;
    }

    public function generateStaticMapLink($lat = 0, $lng = 0, $width = 200, $height = 200) {
      return 'https://maps.googleapis.com/maps/api/staticmap?center='.$lat.','.$lng.'&zoom=15&size='.$width.'x'.$height.'&maptype=roadmap&markers=&markers=color:blue%7C'.$lat.','.$lng.'&key=AIzaSyCCtVf_IsLSSp_u_eOfBakK2cGsHxC3PRA';
    }

    public function generateGmapsLink($lat = 0, $lng = 0, $gmaps_id = '') {
      return 'https://www.google.com/maps/search/?api=1&query='.$lat.','.$lng.'&query_place_id='.$gmaps_id;
    }

    private function exist($facility_id) {
      $sql = "SELECT f.id FROM facilities f WHERE f.id = $facility_id";
      $result = $this->conn->query($sql);

      if($row = $result->fetch_assoc()) {
        return true;
      } else {
        return false;
      }
    }
  }
?>