<?php
    
  /**
   * 
   */
  class Database
  {

    public $conn;
    
    public function __construct() {
      global $configuration;

      $this->conn = new mysqli($configuration->dbHost, $configuration->dbUser, $configuration->dbPassword, $configuration->dbName);

      // Check connection
      if ($this->conn->connect_error) {
        die("Connection failed: " . $this->conn->connect_error);
      }
    }

    public function query($sql = '') {
      $res = $this->conn->query($sql);

      if($this->conn->errno > 0){
        die('SQL error: '.$this->conn->error);
      } else {
        return $res;
      }
    }

    public function insert($table, $values) {
      $fieldsList = '';
      $fieldsValues = '';

      foreach($values as $field => $value) {
        if(strlen($fieldsList)>0)
          $fieldsList.=',';
        $fieldsList.=$field;
        if(strlen($fieldsValues)>0)
          $fieldsValues.=',';
        $fieldsValues.= $this->toSqlValue($value);
      }

      $query="INSERT INTO $table ($fieldsList) VALUES ($fieldsValues)";

      $this->query($query);
    }

    public function update($table, $values, $whereFields) {
      $valuesAss='';
      foreach($values as $field => $value) {
        if(in_array($field,$whereFields))
          continue;
        if(strlen($valuesAss)>0)
          $valuesAss.=', ';
        $valuesAss.= $field.'='.$this->toSqlValue($value);
      }
      $whereCond='';
      foreach($whereFields as $whereField) {
        if(strlen($whereCond)>0)
          $whereCond.=' AND ';
        $whereCond.= $whereField.'='.$this->toSqlValue($values[$whereField]);
      }
      $query="UPDATE $table SET $valuesAss WHERE $whereCond";
      $this->query($query);
    }

    public function toSqlValue($value) {
      if(gettype($value) == 'integer')
        return $value;
      else if(preg_match("/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/",$value))
        return "{ts '$value'}";
      else {
        if($value == '')
          return 'NULL';
        else
          return "'".$this->escapeString($value)."'";
      }
    }

    public function escapeString($string) {
      return $this->conn->real_escape_string($string);
    }

    public function getLastInsertId() {
      return $this->conn->insert_id;
    }
  }

?>