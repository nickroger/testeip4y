<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'sobrenome' => $this->sobrenome,
            'email' => $this->email,
            'cpf' => $this->cpf,
            'datanasc' => $this->datanasc,
            'genero' => $this->genero,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
