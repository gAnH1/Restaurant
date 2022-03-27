<?php

use App\Http\Controllers\API\RestaurantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('restaurants', [RestaurantController::class, 'index']);
Route::post('/add-restaurant', [RestaurantController::class, 'store']);
Route::get('/edit-restaurant/{id}', [RestaurantController::class, 'edit']);
Route::put('update-restaurant/{id}', [RestaurantController::class, 'update']);
Route::delete('delete-restaurant/{id}', [RestaurantController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});