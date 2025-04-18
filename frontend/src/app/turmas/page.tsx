'use client'

import React, { useState } from 'react'
import BaseLayout from '@/components/layout/base-layout'

export default function TurmasPage() {
  const [formData, setFormData] = useState({
    nome: '',
    professor: '',
    diasSemana: [] as string[],
    horario: '',
    faixaMinima: '',
    faixaMaxima: '',
    capacidade: '',
    descricao: ''
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      diasSemana: checked
        ? [...prev.diasSemana, name]
        : prev.diasSemana.filter(day => day !== name)
    }))
  }

  return (
    <BaseLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Cadastro de Turmas</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome da Turma
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
            <label htmlFor="professor" className="block text-sm font-medium text-gray-700">
              Professor
            </label>
            <input
              type="text"
              name="professor"
              id="professor"
              value={formData.professor}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dias da Semana
            </label>
            <div className="space-y-2">
              {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map((dia) => (
                <label key={dia} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    name={dia.toLowerCase()}
                    checked={formData.diasSemana.includes(dia.toLowerCase())}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{dia}</span>
                </label>
              ))}
            </div>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="faixaMinima" className="block text-sm font-medium text-gray-700">
                Faixa Mínima
              </label>
              <select
                name="faixaMinima"
                id="faixaMinima"
                value={formData.faixaMinima}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Selecione</option>
                <option value="branca">Branca</option>
                <option value="azul">Azul</option>
                <option value="roxa">Roxa</option>
                <option value="marrom">Marrom</option>
                <option value="preta">Preta</option>
              </select>
            </div>

            <div>
              <label htmlFor="faixaMaxima" className="block text-sm font-medium text-gray-700">
                Faixa Máxima
              </label>
              <select
                name="faixaMaxima"
                id="faixaMaxima"
                value={formData.faixaMaxima}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Selecione</option>
                <option value="branca">Branca</option>
                <option value="azul">Azul</option>
                <option value="roxa">Roxa</option>
                <option value="marrom">Marrom</option>
                <option value="preta">Preta</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="capacidade" className="block text-sm font-medium text-gray-700">
              Capacidade Máxima
            </label>
            <input
              type="number"
              name="capacidade"
              id="capacidade"
              value={formData.capacidade}
              onChange={handleChange}
              min="1"
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
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cadastrar Turma
            </button>
          </div>
        </form>
      </div>
    </BaseLayout>
  )
} 