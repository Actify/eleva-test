<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Content-Type: application/json; charset=UTF-8");

  include('utils.php');
  include('connection.php');
  include('bo/facility.bo.php');
  include('bo/facilities-list.bo.php');
  include('bo/person.bo.php');
  include('bo/people-list.bo.php');

  $db = new Database();
  $response = null;
  $allowed_methods = array('POST', 'GET');

  if(isset($_GET['api']) && isset($_GET['method'])) {
    $api = $_GET['api'];
    $action = $_GET['method'];
    $method = $_SERVER['REQUEST_METHOD'];
    $data = json_decode(file_get_contents('php://input'), true);

    if(in_array(strtoupper($method), $allowed_methods)) {
      switch ($api) {

        case 'facility':
          $facilityBO = new FacilityBO($db);

          switch ($action) {

            case 'create':
              $response = $facilityBO->create($data);
              break;

            case 'get':
              $response = $facilityBO->get($_GET['id']);
              break;

            case 'update':
              $response = $facilityBO->update($_GET['id'], $data);
              break;

            case 'addStaffMembers':
              foreach ($data as $key => $value) {
                $facilityBO->addStaffMember($_GET['id'], $value);
              }

              $response = $facilityBO->getStaff($_GET['id']);
              
              break;

            case 'getUnlistedPeople':
              $response =  $facilityBO->getUnlistedPeople($_GET['id']);            
              break;

            case 'getStaff':
              $response = $facilityBO->getStaff($_GET['id']);            
              break;
          }
          break;

        case 'facilitiesList':
          $facilitiesListBO = new FacilitiesListBO($db);

          switch ($action) {
            
            case 'getAll':
              $response = $facilitiesListBO->getAll();
              break;
          }
          break;

        case 'peopleList':
          $peopleListBO = new PeopleListBO($db);

          switch ($action) {
            
            case 'getAll':
              $response = $peopleListBO->getAll();
              break;
          }
          break;

        case 'person':
          $personBO = new PersonBO($db);

          switch ($action) {
            
            case 'create':
              $response = $personBO->create($data);
              break;

            case 'get':
              $response = $personBO->get($_GET['id']);
              break;

            case 'update':
              $response = $personBO->update($_GET['id'], $data);
              break;

            case 'delete':
              $response = $personBO->delete($_GET['id']);
              break;

            case 'removeAssociatedFacility':
              $personBO->removeAssociatedFacility($_GET['id'], $_GET['facility']);
              $response = $personBO->getAssociatedFacilities($_GET['id']);
              break;
          }
          break;
      }
    }    
  }

  $db->conn->close();

  if(isset($response) && is_array($response) || is_object($response)) {
    echo json_encode($response);
  }
?>