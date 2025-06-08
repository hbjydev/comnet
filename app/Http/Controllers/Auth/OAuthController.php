<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    public function discordRedirect()
    {
        return Socialite::driver('discord')->redirect();
    }

    public function discordCallback()
    {
        $discordUser = Socialite::driver('discord')->user();
        if ($user = User::where('discord_id', $discordUser->id)->first()) {
            Auth::login($user);

            return to_route('dashboard');
        }

        $url = $discordUser->avatar;
        $contents = file_get_contents($url);
        $avatarPath = 'user/avatar/'.$discordUser->id;
        Storage::put($avatarPath, $contents);

        $user = User::create([
            'username' => $discordUser->name,
            'display_name' => $discordUser->user['global_name'], // display name
            'avatar' => $avatarPath,
            'email' => $discordUser->email,
            'email_verified_at' => now(),
            'discord_id' => $discordUser->id,
        ]);

        Auth::login($user);

        return to_route('dashboard');
    }
}
