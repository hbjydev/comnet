<?php

namespace App\Http\Requests\Settings;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Laravel\Passport\Passport;

class TokenCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'expires_at' => [
                'required',
            ],
            'scopes' => [
                'required',
                'array',
            ],
            'scopes.*' => Rule::in(Passport::scopeIds()),
        ];
    }
}
