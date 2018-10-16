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

    /*public function listNearby($userId, $lat, $lng, $radius, $page) {

      $sql= 'SELECT a.IDEVENT, a.TITLE, a.DTCREAT, a.IDOWNER, a.DTSTART, a.DTEND, a.DTENDSUBSCRIB, a.ORGPLACE, a.EVENTPLACE, a.EVENTPLACELAT, a.EVENTPLACELNG, a.MINPART, a.MAXPART, a.NOTES, a.COVERIMG, a.VISIBILITY, a.WHOLEDAY, a.STATUS, b.NAME AS OWNER_NAME, b.SURNAME AS OWNER_SURNAME, b.USERTYPE AS OWNER_USERTYPE, b.URLPROFILEPIC as OWNER_URLPROFILEPIC, IFNULL(e.STATUS,'.SingleEventBO::STATUS_UNDEF.') AS PART_STATUS, e.IDSENDER, ';
      $sql.= '0 AS DIFF, EVENTPLACEDIST ';
      $sql.= 'FROM (';
      $sql.= 'SELECT '.str_replace('a.','aa.','a.IDEVENT, a.TITLE, a.DTCREAT, a.IDOWNER, a.DTSTART, a.DTEND, a.DTENDSUBSCRIB, a.ORGPLACE, a.EVENTPLACE, a.EVENTPLACELAT, a.EVENTPLACELNG, a.MINPART, a.MAXPART, a.NOTES, a.COVERIMG, a.VISIBILITY, a.WHOLEDAY, a.STATUS').', p.radius, p.distance_unit ';
          $sql.= '* DEGREES(ACOS(COS(RADIANS(p.latpoint)) ';
          $sql.= '* COS(RADIANS(aa.EVENTPLACELAT)) ';
          $sql.= '* COS(RADIANS(p.longpoint - aa.EVENTPLACELNG)) ';
          $sql.= '+ SIN(RADIANS(p.latpoint)) ';
          $sql.= '* SIN(RADIANS(aa.EVENTPLACELAT)))) AS EVENTPLACEDIST ';
      $sql.= 'FROM events AS aa ';
      $sql.= 'JOIN (';
          $sql.= "SELECT $lat  AS latpoint,  $lng AS longpoint, $radius AS radius, 111.045 AS distance_unit) AS p ";
      $sql.= 'WHERE aa.EVENTPLACELAT ';
      $sql.= 'BETWEEN p.latpoint  - (p.radius / p.distance_unit) ';
          $sql.= 'AND p.latpoint  + (p.radius / p.distance_unit) ';
      $sql.= 'AND aa.EVENTPLACELNG ';
      $sql.= 'BETWEEN p.longpoint - (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint)))) ';
          $sql.= 'AND p.longpoint + (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint)))) ';
      $sql.= ') AS a ';
      $sql.= 'WHERE a.EVENTPLACEDIST <= a.radius ';
      $sql.= 'ORDER BY date(DTSTART), EVENTPLACEDIST';
      $categoriesBO=new CategoriesBO();
      $rows=array();
      $result=$mysqli->query($sql);
      while($row = $result->fetch_object()) {
        $row->DIFF=time()-strtotime($row->DTCREAT);
        $row->CATEGORIES=$categoriesBO->getEventCategories($row->IDEVENT);
        $rows[] = $row;
      }
      return getResponse($rows);
    }*/

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