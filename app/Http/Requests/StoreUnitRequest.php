<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreUnitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::hasUser();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'avatar' => ['nullable:image'],
            'banner' => ['nullable:image'],
            'display_name' => ['string', 'required', 'max:64'],
            'slug' => ['string', 'required', 'lowercase', 'unique:units', 'min:4', 'max:32'],
            'description' => ['nullable:string'],
        ];
    }
}
