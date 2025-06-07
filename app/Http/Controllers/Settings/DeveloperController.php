<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\TokenCreateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DeveloperController extends Controller
{
    /**
     * Show the user's developer settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/developer', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    public function issue_token(TokenCreateRequest $request): Response
    {
        $data = $request->validated();
        $token = $request->user()->createToken($data->name, $data->scopes);
        dd($token);
    }
}
