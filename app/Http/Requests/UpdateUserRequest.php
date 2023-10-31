<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'email' => 'required|email|unique:users,email,'.$this->id,
            'cpf' => 'required|string|unique:users,cpf,'.$this->id,
            'datanasc' => 'required|string|max:55',
            'genero' => 'required|string|max:55',
        ];
    }
}
