<?php
require 'vendor/autoload.php';
require 'lib/cors.php';

//Set enable CORS: Cross-Origin Resource Sharing
cors();

//Initialize Slim
$app = new \Slim\Slim();

//Data to use
// $app->puzzles = json_decode(file_get_contents('./data/data.init.json'));
$puzzles = json_decode(file_get_contents('./data/data.json'));

//Route root
$app->get('/', function () use ($app){
  global $puzzles;
  $app->response()->header('Content-Type', 'application/json');
  echo json_encode($puzzles);
});

//Get all entries
$app->get('/puzzles', function () use ($app){
	global $puzzles;
  $app->response()->header('Content-Type', 'application/json');
  echo json_encode($puzzles);
});

//Get all entries
$app->get('/puzzles_reset', function () use ($app){
  global $puzzles;
  $puzzles = json_decode(file_get_contents('./data/data.init.json'));
  file_put_contents('./data/data.json',json_encode($puzzles));
  $app->response()->header('Content-Type', 'application/json');
  echo json_encode($puzzles);
});

//Get one entry identified by the index of array
$app->get('/puzzles/:id', function ($id) use ($app){
  global $puzzles;
  $app->response()->header('Content-Type', 'application/json');
	echo json_encode([$puzzles[$id]]);
});

//Add and entry
$app->post('/add_puzzle', function () use ($app){
  global $puzzles;
  try {
    // get and decode JSON request body
    $request = $app->request();
    $body = $request->getBody();
    $input = json_decode($body, true);
    

    array_push($puzzles, $input['value']);

    
    file_put_contents('./data/data.json',json_encode($puzzles));
    // return JSON-encoded response body
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($puzzles);
  } catch (Exception $e) {
    $app->response()->status(400);
    $app->response()->header('X-Status-Reason', $e->getMessage());
  }
});

//Update an entry identified by the index of array
$app->put('/puzzles/:id', function ($id) use ($app){
  global $puzzles;
  try {
    // get and decode JSON request body
    $request = $app->request();
    $body = $request->getBody();
    $input = json_decode($body, true);
    

    $puzzles[$id] = $input['value'];

    
    file_put_contents('./data/data.json',json_encode($puzzles));
    // return JSON-encoded response body
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($puzzles);
  } catch (Exception $e) {
    $app->response()->status(400);
    $app->response()->header('X-Status-Reason', $e->getMessage());
  }
});

//Delete an entry identified by the index of array
$app->delete('/puzzles/:id', function ($id) use ($app){
  global $puzzles;
  try {
    // get and decode JSON request body
    array_splice($puzzles, $id, 1);
    file_put_contents('./data/data.json',json_encode($puzzles));
    // return JSON-encoded response body
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($puzzles);
  } catch (Exception $e) {
    $app->response()->status(400);
    $app->response()->header('X-Status-Reason', $e->getMessage());
  }
});

//No more routes, so we show an error
$app->notFound(function () use ($app) {
	echo '{
		"error" : "Sorry, route not available"
	}
	';
});

//Start the server
$app->run();