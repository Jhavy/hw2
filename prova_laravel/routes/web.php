<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/','LoginController@login'); 



Route::get('/login','LoginController@login')->name("login");
Route::post('/login','LoginController@checkLogin');
Route::get('/login/getData','LoginController@getData');
Route::get('/login/getData/loghi','LoginController@getLoghi');

Route::get("/logout", "LoginController@logout")->name("logout");


Route::get('/signup', "RegisterController@index")->name('signup');
Route::post('/signup', "RegisterController@create");
Route::get("/signup/username/{q}", "RegisterController@checkUsername");

Route::get('/home', "HomeController@index")->name('home');
Route::get('/home/getNews/{i}', "HomeController@getNews");
Route::get('/home/checkLike/{id}', "HomeController@checkLike");
Route::get('/home/addLike/{id}', "HomeController@addLike");
Route::get('/home/removeLike/{id}', "HomeController@removeLike");
Route::get('/home/loadLikes/{id}', "HomeController@loadLikes");

Route::get('/teams', "TeamsController@index");
Route::get('/teams/checkFavouriteTeamsOnLoading/{id}', "TeamsController@checkFavouriteTeamsOnLoading");
Route::get('/teams/getDataTeams/{id}', "TeamsController@getDataTeams");
Route::get('/teams/addTeamFavourite/{id}', "TeamsController@addTeamFavourite");
Route::get('/teams/removeTeamFavourite/{id}', "TeamsController@removeTeamFavourite");

Route::get('/standings', "StandingsController@index");
Route::get('/standings/getTeamPreferitiArray', "StandingsController@getTeamPreferitiArray");
Route::get('/standings/getDataRiders', "StandingsController@getDataRiders");

Route::get('/shop', "ShopController@index");
Route::post('/shop', "ShopController@acquista");
Route::get('/shop/getGPdati', "ShopController@getGPdati");

Route::get('/ordini', "OrdersController@index")->name("ordini");
Route::get('/ordini/getOrdini', "OrdersController@getOrdini");
Route::get('/ordini/getSubOrdini/{id_ordine}', "OrdersController@getSubOrdini");