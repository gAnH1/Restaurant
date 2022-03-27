<?php

namespace App\Http\Controllers\API;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::all();
        return response()->json([
            'status'=> 200,
            'restaurants'=>$restaurants,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'address'=>'required|max:191',
            'email'=>'required|email|max:191',
            'phone'=>'required|max:10|min:10',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
            $restaurant = new Restaurant;
            $restaurant->name = $request->input('name');
            $restaurant->address = $request->input('address');
            $restaurant->email = $request->input('email');
            $restaurant->phone = $request->input('phone');
            $restaurant->save();

            return response()->json([
                'status'=> 200,
                'message'=>'Restaurant Added Successfully',
            ]);
        }

    }

    public function edit($id)
    {
        $restaurant = Restaurant::find($id);
        if($restaurant)
        {
            return response()->json([
                'status'=> 200,
                'restaurant' => $restaurant,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Restaurant ID Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'address'=>'required|max:191',
            'email'=>'required|email|max:191',
            'phone'=>'required|max:10|min:10',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validationErrors'=> $validator->messages(),
            ]);
        }
        else
        {
            $restaurant = Restaurant::find($id);
            if($restaurant)
            {

                $restaurant->name = $request->input('name');
                $restaurant->address = $request->input('address');
                $restaurant->email = $request->input('email');
                $restaurant->phone = $request->input('phone');
                $restaurant->update();

                return response()->json([
                    'status'=> 200,
                    'message'=>'Restaurant Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message' => 'No Restaurant ID Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $restaurant = Restaurant::find($id);
        if($restaurant)
        {
            $restaurant->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Restaurant Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Restaurant ID Found',
            ]);
        }
    }
}