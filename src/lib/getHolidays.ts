import type { APIRoute } from "astro";
import * as cheerio from "cheerio";
import { parse, format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formatDatePtBr = (dateStr: string) => {
    const parsedDate = parse(dateStr, "d/M/yy", new Date(), {
        locale: ptBR,
    });
    return format(parsedDate, "dd/MM/yyyy");
}
export async function getHolidays(year: string): Promise<ItemToRender[]> {
    const response = await fetch(
        `https://www.anbima.com.br/feriados/fer_nacionais/${year}.asp`,
    );
    const anbimaHtml = await response.text();
    const $ = cheerio.load(anbimaHtml);

    const valuesToRender: ItemToRender[] = [];

    $(`table.interna tr:not(:first-child)`).each((_, tr) => {
        let splitedValues = $(tr).text().replaceAll("\t", "").split("\n");
        let data = formatDatePtBr(splitedValues[1].replace(/[\t\n ]+/g, ""));
        let diaSemana = splitedValues[2];
        let feriado = splitedValues[3];
        valuesToRender.push({
            data: data,
            diaSemana: diaSemana,
            feriado: feriado,
        });
    });

    return valuesToRender;
}