'use client'

import React, { useState } from 'react'
import BaseLayout from '@/components/layout/base-layout'

export default function EventosPage() {
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    data: '',
    horario: '',
    local: '',
    descricao: '',
    valor: '',
    vagas: '',
    requisitos: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar envio do formulário
    console.log('Dados do formulário:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <BaseLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Cadastro de Eventos</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome do Evento
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
              Tipo de Evento
            </label>
            <select
              name="tipo"
              id="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Selecione o tipo</option>
              <option value="campeonato">Campeonato</option>
              <option value="seminario">Seminário</option>
              <option value="graduacao">Graduação</option>
              <option value="treinamento">Treinamento</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                Data
              </label>
              <input
                type="date"
                name="data"
                id="data"
                value={formData.data}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="horario" className="block text-sm font-medium text-gray-700">
                Horário
              </label>
              <input
                type="time"
                name="horario"
                id="horario"
                value={formData.horario}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="local" className="block text-sm font-medium text-gray-700">
              Local
            </label>
            <input
              type="text"
              name="local"
              id="local"
              value={formData.local}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              name="descricao"
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
                Valor
              </label>
              <input
                type="number"
                name="valor"
                id="valor"
                value={formData.valor}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="vagas" className="block text-sm font-medium text-gray-700">
                Vagas
              </label>
              <input
                type="number"
                name="vagas"
                id="vagas"
                value={formData.vagas}
                onChange={handleChange}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="requisitos" className="block text-sm font-medium text-gray-700">
              Requisitos
            </label>
            <textarea
              name="requisitos"
              id="requisitos"
              value={formData.requisitos}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: Faixa mínima, idade mínima, documentos necessários..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cadastrar Evento
            </button>
          </div>
        </form>
      </div>
    </BaseLayout>
  )
} 