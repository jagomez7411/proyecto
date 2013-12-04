// JavaScript Document

var IP="";
function buscaralumnos(Gpo)
{
	 datos="Grupo="+Gpo;
	 $.ajax({
		      type:"POST",
			  url:"http://"+IP+"/lista/agregar.php",
			  data:datos
	 }).done(function(msg){
		 if(msg=="*"||msg==null)
		 {alert("No se encontraron alumnos en ese grupo");
		 }
		 else
		 {
			 alert(msg);
		 }
	 });
}
		 
$(document).ready(function(e){
	document.addEventListener("deviceready",function(){
		
		$('.Enviar').tap(function(){
			alert ("ENviar");
			var formulario=$(this).parents('form');
			switch(formulario.attr('name'))
			{
				case 'enviarF':
				alert ("Dentro formulario enviarF");
				IP=document.getElementById('conectar').value;
				alert ("IP");
				alert (document.getElementById('Grupo').value);
				buscarlaumnos(document.getElementById('Grupo').value);
				break;
			}
		});
		
		
var db=openDatabase("PaseLista","1.0","PaseLista",65535);


	
$('#TabAlumnos').bind("click",function(event){

	db.transaction(function(ejecutar) {
		
	var SQL="CREATE TABLE Alumnos(NoControl VARCHAR(14) NOT NULL PRIMARY KEY, Nombre VARCHAR(40) NOT NULL, ApellidoP VARCHAR(35), ApellidoM VARCHAR(35), Grupo VARCHAR(2))"			

ejecutar.executeSql(SQL,undefined, function() {				

alert("Tabla Alumnos Creada");

   }, error); 
   });//ejecutar 
   });//click crear		


$('#TabAsistencias').bind("click",function(event){

	db.transaction(function(ejecutar) {
		
	var SQL="CREATE TABLE Asistencias(NoControl VARCHAR(14) NOT NULL, Fecha TEXT NOT NULL, Asistencia INTEGER NOT NULL, Asignatura VARCHAR(10) NOT NULL)"			

ejecutar.executeSql(SQL,undefined, function() {				

alert("Tabla Asistencias Creada");

   }, error); 
   });//ejecutar 
   });//click crear		

$('#TabGrupos').bind("click",function(event){

	db.transaction(function(ejecutar) {
		
	var SQL="CREATE TABLE Grupos(Grupo VARCHAR(2) NOT NULL, Activo INTEGER NOT NULL, Asignatura TEXT NOT NULL)"			

ejecutar.executeSql(SQL,undefined, function() {				

alert("Tabla Grupos Creada");

   }, error); 
   });//ejecutar 
   });//click crear	
   
$('#TabAsignatura').bind("click",function(event){

	db.transaction(function(ejecutar) {
		
	var SQL="CREATE TABLE Asignaturas(Asignatura VARCHAR(10) NOT NULL, Nombre TEXT NOT NULL)"			

ejecutar.executeSql(SQL,undefined, function() {				

alert("Tabla Asignaturas Creada");

   }, error); 
   });//ejecutar 
   });//click crear
      
$('#EliminarAlumnos').bind("click",function(event){

	if(!confirm("Borrar Tabla?? ",""))return;
	db.transaction(function(ejecutar) {
	var SQL="DROP TABLE Alumnos";
	ejecutar.executeSql(SQL,undefined, function() {				
    alert("Tabla Alumnos Borrada");

   }, error); 
   });//ejecutar 
   });//click eliminar 
   
$('#EliminarAsistencia').bind("click",function(event){

	if(!confirm("Borrar Tabla?? ",""))return;
	db.transaction(function(ejecutar) {
	var SQL="DROP TABLE Asistencias";
	ejecutar.executeSql(SQL,undefined, function() {				
    alert("Tabla Asistencias Borrada");

   }, error); 
   });//ejecutar 
   });//click eliminar 
   
$('#EliminarGrupos').bind("click",function(event){

	if(!confirm("Borrar Tabla?? ",""))return;
	db.transaction(function(ejecutar) {
	var SQL="DROP TABLE Grupos";
	ejecutar.executeSql(SQL,undefined, function() {				
    alert("Tabla Grupos Borrada");

   }, error); 
   });//ejecutar 
   });//click eliminar 

$('#EliminarAsignaturas').bind("click",function(event){

	if(!confirm("Borrar Tabla?? ",""))return;
	db.transaction(function(ejecutar) {
	var SQL="DROP TABLE Asignaturas";
	ejecutar.executeSql(SQL,undefined, function() {				
    alert("Tabla Asignaturas Borrada");

   }, error); 
   });//ejecutar 
   });//click elimina

$("#Insertar").bind ("click", function (event)
{
  var v_nombre = $("#nombre").val ();
  var v_apellido = $("#apellido").val ();
  
  db.transaction (function (ejecutar) 
  {
    var sql = "INSERT INTO Clientes (nombre, apellido) VALUES (?, ?)";
    ejecutar.executeSql (sql, [v_nombre, v_apellido], function ()
    { 
      alert ("Cliente Agregado");
    }, error);
  });
});

$("#Listar").bind ("click", function (event)
{
  db.transaction (function (ejecutar) 
  {
    var sql = "SELECT * FROM Clientes";

    ejecutar.executeSql (sql, undefined,

    function (ejecutar, resultado)
    {
      var a_html = "<ul>";
      if (resultado.rows.length)
      {
        for (var i = 0; i < resultado.rows.length; i++) 
        {
          var fila = resultado.rows.item (i);
          var v_nombre = fila.nombre;
          var v_apellido = fila.apellido;
		  var v_id = fila.id;
		  
          a_html += "<li data-icon=false id= " + v_id + " >";
		  
		  a_html += "<a href=#>";
		  
		  a_html += v_nombre + "&nbsp;" + v_apellido;
		  
		  a_html += "<\a>";
		  
		  a_html += "<\li>";
		}
      }
      else
      {
        a_html += "<li> No hay clientes </li>";
      }
      
      a_html += "</ul>";
      
      $("#listado").unbind ().bind ("pagebeforeshow", function ()
      {
        var $contenido = $("#listado div:jqmData(role=content)");
        $contenido.html (a_html);
        var $ul = $contenido.find ("ul");
        $ul.listview ();
		$("li").bind ("swiperight", function (event)
        {
          var id_borrar = $(this).attr ("id");
          if (!id_borrar) return;
          
          $(this).remove ();
          
          db.transaction (function (ejecutar) 
          {
            var SQL = "DELETE FROM Clientes WHERE id=?";
            ejecutar.executeSql (SQL, [id_borrar], function ()
            { 
              navigator.notification.beep(3);
			  alert ("Cliente Borrado");
            }, error);//ejecutar
          });// transaction
        });// swipe right 
      });
	  
	  
      
      $.mobile.changePage ($("#listado"));
      
    }, error);
  });
  });
  

function error (ejecutar, err) 
{
  alert ("Error de Base de Datos : " + err.message);
  return false;
}    

},false);//ready device


	
	
});//document

