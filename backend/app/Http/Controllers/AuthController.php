<?php

namespace App\Http\Controllers;

use App\Domain\Repositories\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(Request $req) {
        $req->validate([
            'name'     => 'required|string',
            'username' => 'required|unique:users',
            'password' => 'required|min:6',
        ]);
        $user = $this->userRepository->create([
            'name'     => $req->name,
            'username' => $req->username,
            'password' => bcrypt($req->password),
        ]);
        return response()->json([
            'token' => $user->createToken('auth')->plainTextToken,
            'user'  => $user
        ], 201);
    }

    public function login(Request $req) {
        $req->validate([
            'username' => 'required',
            'password' => 'required',
        ]);
        $user = $this->userRepository->findByUsername($req->username);
        if (!$user || !Hash::check($req->password, $user->password))
            return response()->json(['message' => 'Kredensial salah'], 401);
        return response()->json([
            'token' => $user->createToken('auth')->plainTextToken,
            'user'  => $user
        ]);
    }

    public function logout(Request $req) {
        $req->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout berhasil']);
    }
}
