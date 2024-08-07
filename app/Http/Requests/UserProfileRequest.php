<?php

namespace App\Http\Requests;

use App\Rules\CurrentPasswordRule;
use App\Rules\PasswordSameNewPasswordRule;
use Illuminate\Foundation\Http\FormRequest;

class UserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $this->user()->id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $this->user()->id,
            'current_password' => 'nullable',
        ];

        if ($this->filled('current_password')) {
            $rules['current_password'] = ['required', new CurrentPasswordRule];
            $rules['password'] = ['required','min:8','confirmed', new PasswordSameNewPasswordRule];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'current_password.required' => 'Current password is required when changing password.',
            'password.required' => 'New password is required when changing password.',
            'password.min' => 'New password must be at least 8 characters long.',
            'password.confirmed' => 'New password confirmation does not match.',
        ];
    }
}
