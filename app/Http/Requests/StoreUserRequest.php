<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nome' => 'required|string|max:55',
            'sobrenome' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
            'cpf' => 'required|string|unique:users,cpf',
            'datanasc' => 'required|string|max:55',
            'genero' => 'required|string|max:55',
        ];
    }
}
